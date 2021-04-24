import { AxiosAdapter } from 'axios';
import {
  Config, FileUpdateInput, MediaItem, UploadFile,
  DeletesOptions,
  DownloadableLinkData,
  AttachmentDeleteData,
  AttachmentUploadData,
  FolderCreateOptions,
  FolderUpdateInput,
  ContentShareOptions,
  DownloadableLinkOptions,
  SharedContentData,
  FileUploadOptions,
} from './types'

export class Media {
  protected http: AxiosAdapter
  protected forceDeletes: boolean

  constructor({ axios, baseURL = "/", headers = {}, forceDeletes = false }: Config = {}) {
    this.http = axios
      ? axios
      : require("axios").default.create({
          baseURL,
          headers
        });
    this.forceDeletes = forceDeletes;
  }

  /**
   * Brows files and folders in a location
   *
   * @param {string} location
   * @returns {Promise<MediaItem[]>}
   */
  async browse(location: string) {
    const { data } = await this.http({
      method: "post",
      url: "/browse",
      data: { location }
    });

    return data;
  }

  /**
   * Upload file
   *
   * @param {File} file
   * @param {FileUploadOptions} options
   * @param {Function} callback upload progress callback
   * @returns {Promise<MediaItem>}
   */
  async upload(file: UploadFile, { location = '/', ...options }: FileUploadOptions = {}, callback?: (progress: number) => void): Promise<MediaItem> {
    const form = new FormData();
    form.append('file', file);
    form.append("location", location);
    for(const key in options){
      // @ts-ignore
      form.append(key, options[key] as string);
    }

    const { data } = await this.http({
      method: "post",
      url: "/upload",
      data: form,
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        if(callback){
          callback(Math.round((progressEvent.loaded / progressEvent.total) * 100))
        }
      }
    });

    return data;
  }

  /**
   * Update a file
   * File can be a {MediaItem} object or file ID
   *
   * @param {MediaItem|string} file
   * @param {FileUpdateInput} input
   * @returns {Promise<MediaItem>}
   */
  async update(file: MediaItem | string, input: FileUpdateInput): Promise<MediaItem> {
    this.setLoading(file)
    const id = typeof file === "string" ? file : file.id;
    const { data } = await this.http({
      method: "post",
      url: `/update/${id}`,
      data: input
    });
    this.setLoading(file, false)

    return data;
  }

  /**
   * Move file to a location
   * File can be a {MediaItem} object or file ID
   * Location could be the path or a folder ID
   *
   * @param {MediaItem|string} file
   * @param {string} location
   * @returns {Promise<MediaItem>}
   */
  async move(file: MediaItem | string, location: string): Promise<MediaItem> {
    this.setLoading(file)
    const id = typeof file === "string" ? file : file.id;
    const { data } = await this.http({
      method: "post",
      url: `/move/${id}`,
      data: {
        location
      }
    });
    this.setLoading(file, false)

    return data;
  }

  /**
   * Delete a file
   * File can be a {MediaItem} object or file ID
   *
   * @param {MediaItem|string} file
   * @param {DeletesOptions} options
   * @returns {Promise<MediaItem>}
   */
  async delete(file: MediaItem | string, options: DeletesOptions = {}): Promise<MediaItem> {
    this.setLoading(file)
    const id = typeof file === "string" ? file : file.id;
    const { data } = await this.http({
      method: "delete",
      url: `/delete/${id}`,
      data: {
        ...options,
        force: options.force !== undefined ? options.force : this.forceDeletes
      }
    });

    return data;
  }

  /**
   * Get file's downloadable
   *
   * @param {MediaItem|string} file
   * @param {DownloadableLinkOptions} options
   * @returns {Promise<DownloadableLinkData>}
   */
  async downloadableLink(file: MediaItem | string, options: DownloadableLinkOptions = {}): Promise<DownloadableLinkData> {
    const id = typeof file === "string" ? file : file.id;

    const { data } = await this.http({
      method: "post",
      url: `/downloadable-link/${id}`,
      data: options,
    });

    return data;
  }

  /**
   * Share file and get url
   *
   * @param {MediaItem|string} file
   * @param {ContentShareOptions} options
   * @returns {Promise<SharedContentData>}
   */
  async share(file: MediaItem | string, options: ContentShareOptions = {}): Promise<SharedContentData> {
    const id = typeof file === "string" ? file : file.id;
    const { data } = await this.http({
      method: "post",
      url: `/share/${id}`,
      data: options,
    });

    return data;
  }

  private setLoading(file: MediaItem | string, loading = true){
    if(typeof file !== 'string'){
      // @ts-ignore
      file.loading = loading
    }
  }

  get attachment() {
    const instance = this;

    return {
      /**
       * Upload an attachment
       *
       * @param {UploadFile} file
       * @returns {Promise<AttachmentUploadData>}
       */
      async upload(file: UploadFile): Promise<AttachmentUploadData> {
        const form = new FormData();
        form.append('file', file);

        const { data } = await instance.http({
          method: "post",
          url: "/attachment",
          data: form,
          headers: { "content-type": "multipart/form-data" }
        });

        return data;
      },

      /**
       * Purge an uploaded attachment
       *
       * @param {string} url attachment url or ID
       * @returns {Promise<AttachmentDeleteData>}
       */
      async purge(url: string): Promise<AttachmentDeleteData> {
        const { data } = await instance.http({
          method: "delete",
          url: `/attachment/${url}`
        });

        return data;
      }
    };
  }

  get folder() {
    const instance = this;

    return {
      /**
       * Create a folder
       *
       * @param {string} name
       * @param {string} location
       * @param {FolderCreateOptions} options
       * @returns {Promise<MediaItem>}
       */
      async create(name: string, location: string, options: FolderCreateOptions = {}): Promise<MediaItem> {
        const { data } = await instance.http({
          method: "post",
          url: "folder/create",
          data: { name, location, ...options }
        });

        return data;
      },

      /**
       * Create a folder
       *
       * @param {MediaItem|string} folder
       * @param {FolderUpdateInput} input
       * @returns {Promise<MediaItem>}
       */
      async update(folder: MediaItem | string, input: FolderUpdateInput): Promise<MediaItem> {
        instance.setLoading(folder)
        const id = typeof folder === "string" ? folder : folder.id;
        const { data } = await instance.http({
          method: "post",
          url: `/folder/update/${id}`,
          data: input
        });
        instance.setLoading(folder, false)

        return data;
      },

      /**
       * Move folder to a new location
       * Folder can be a {MediaItem} object or the folder ID
       * Location could be the path or a folder ID
       *
       * @param {MediaItem|string} folder
       * @param {string} location
       * @returns {Promise<MediaItem>}
       */
      async move(folder: MediaItem | string, location: string): Promise<MediaItem> {
        instance.setLoading(folder)
        const id = typeof folder === "string" ? folder : folder.id;
        const { data } = await instance.http({
          method: "post",
          url: `/folder/move/${id}`,
          data: {
            location
          }
        });
        instance.setLoading(folder, false)

        return data;
      },

      /**
       * Delete a folder
       * Folder can be a {MediaItem} object or the folder ID
       *
       * @param {MediaItem|string} file
       * @param {DeletesOptions} options
       * @returns {Promise<MediaItem>}
       */
      async delete(folder: MediaItem|string, options: DeletesOptions = {}): Promise<MediaItem> {
        instance.setLoading(folder)
        const id = typeof folder === "string" ? folder : folder.id;
        const { data } = await instance.http({
          method: "delete",
          url: `/folder/delete/${id}`,
          data: {
            ...options,
            force:
              options.force !== undefined
                ? options.force
                : instance.forceDeletes
          }
        });

        return data;
      },

      /**
       * Share folder and get url
       *
       * @param {MediaItem|string} folder
       * @param {ContentShareOptions} options
       * @returns {Promise<SharedContentData>}
       */
      async share(folder: MediaItem | string, options: ContentShareOptions = {}): Promise<SharedContentData> {
        const id = typeof folder === "string" ? folder : folder.id;
        const { data } = await instance.http({
          method: "post",
          url: `/folder/share/${id}`,
          data: options,
        });

        return data;
      }
    };
  }

  get sync() {
    const instance = this;

    const o = {
      /**
       * Upload file into the current directory or a given director
       *
       * @param {UploadFile} file
       * @param {FileUploadOptions} location
       * @param {Function} callback upload progress callback
       * @returns {Promise<MediaItem>}
       */
      async upload(file: UploadFile, { location, ...options }: FileUploadOptions = {}, callback?: (progress: number) => void) {
        const dest = location ? location : o._cwd;
        const data = await instance.upload(file, { location: dest, ...options }, callback);
        if (dest === o._cwd) o.dataAdd(data);
        return data;
      },

      /**
       * Update a file
       * File can be a {MediaItem} object or file ID
       *
       * @param {MediaItem|string} file
       * @param {FileUpdateInput} input
       * @returns {Promise<MediaItem>}
       */
      async update(file: MediaItem | string, input: FileUpdateInput): Promise<MediaItem> {
        const data = await instance.update(file, input);
        o.dataUpdate(data);
        return data;
      },

      /**
       * Move file to a location
       * File can be a {MediaItem} object or file ID
       * Location could be the path or a folder ID
       *
       * @param {MediaItem|string} file
       * @param {string} location
       * @returns {Promise<MediaItem>}
       */
      async move(file: MediaItem | string, location: string): Promise<MediaItem> {
        const data = await instance.move(file, location);
        if (location === o._cwd) o.dataAdd(data);
        else o.dataRemove(data);
        return data;
      },

      /**
       * Delete a file
       * File can be a {MediaItem} object or file ID
       *
       * @param {MediaItem|string} file
       * @returns {Promise<MediaItem>}
       */
      async delete(file: MediaItem | string): Promise<MediaItem> {
        const data = await instance.delete(file);
        o.dataRemove(data);
        return data;
      },

      get folder() {
        return {
          /**
           * Create a folder in the current directly or a given directory
           *
           * @param {string} name
           * @param {string} location
           * @param {FolderCreateOptions} options
           * @returns {Promise<MediaItem>}
           */
          create: async (name: string, location?: string, options: FolderCreateOptions = {}): Promise<MediaItem> => {
            const dest = location ? location : o._cwd;
            const data = await instance.folder.create(name, dest, options);
            if (dest === o._cwd) o.dataAdd(data);
            return data;
          },

          /**
           * Create a folder
           *
           * @param {MediaItem|string} folder
           * @param {FolderUpdateInput} input
           * @returns {Promise<MediaItem>}
           */
          update: async (name: MediaItem | string, input: FolderUpdateInput) => {
            const data = await instance.folder.update(name, input);
            o.dataUpdate(data);
            return data;
          },

          /**
           * Move folder to a new location
           * Folder can be a {MediaItem} object or the folder ID
           * Location could be the path or a folder ID
           *
           * @param {MediaItem|string} folder
           * @param {string} location
           * @returns {Promise<MediaItem>}
           */
          move: async (folder: MediaItem | string, location: string): Promise<MediaItem> => {
            const data = await instance.folder.move(folder, location);
            if (location === o._cwd) o.dataAdd(data);
            else o.dataRemove(data);
            return data;
          },

          /**
           * Delete a folder
           * Folder can be a {MediaItem} object or the folder ID
           *
           * @param {MediaItem|string} file
           * @param {DeletesOptions} options
           * @returns {Promise<MediaItem>}
           */
          delete: async (folder: MediaItem | string, options: DeletesOptions = {}): Promise<MediaItem> => {
            const data = await instance.folder.delete(folder, options);
            o.dataRemove(data);
            return data;
          }
        };
      },

      _loading: false,
      _cwd: "/",
      data: [] as any[],
      get loading() {
        return o._loading;
      },
      get files() {
        return o.data;
      },
      get cwd() {
        return o._cwd;
      },
      set cwd(value) {
        o._cwd = (value !== undefined && value)? value : '/';
        o.fresh();
      },
      async fresh() {
        o._loading = true;
        const data = await instance.browse(o._cwd);
        o.data = data;
        o._loading = false;
      },

      dataAdd(data: any) {
        const index = o.data.findIndex(({ id }) => data.id == id);
        if (index < 0) {
          o.data.push(data as any);
        }
      },
      dataUpdate(data: any) {
        const index = o.data.findIndex(({ id }) => data.id == id);
        if (index >= 0) {
          const temp = o.data;
          temp[index] = data;
          o.data = [...temp];
        }
      },
      dataRemove(data: any) {
        const index = o.data.findIndex(({ id }) => data.id == id);
        if (index >= 0) {
          o.data.splice(index, 1);
        }
      }
    };

    // intial auto-load
    setTimeout(() => o.fresh(), 100);

    return o;
  }
}
