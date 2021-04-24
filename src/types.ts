import { AxiosAdapter } from 'axios';

export type Config = {
  axios?: AxiosAdapter
  baseURL?: string
  headers?: Record<string, any>
  forceDeletes?: boolean
}

export type MediaImage = {
  alt: string
  [responsive: string]: string
}

export type File = {
  id: string
  name: string
  description: string
  image?: MediaImage
  type: "video" | "audio" | "image" | "docs" | "application" | string
  private: boolean
  disk: string
  size: number
}

export type Folder = {
  id: string
  name: string
  description: string
  image?: MediaImage
  type: "folder"
  private: boolean
  disk: string
  size: number
  folders: Folder[]
  files: File[]
}

export type Attachment = {
  id: string
  name: string
  alt: string
  url: string
  disk: string
  size: number
  pending: boolean
  location: string
}

export type SharedContent = {
  id: string
  name: string
}

export type MediaItem = File | Folder | {
  [key: string]: any
}

export type DeletesOptions = {
  force?: boolean
}

export type FileUploadOptions = {
  name?: string
  location?: string
  description?: string
  private?: boolean
  disk?: string
}

export type DownloadableLinkOptions = {
  ttl?: number
}

export type ContentShareOptions = {
  ttl?: number
}

export type FileUpdateInput = {
  name?: string
  description?: string
  disk?: string
}

export type FolderCreateOptions = {
  description?: string
  disk?: string
  private?: boolean
}

export type FolderUpdateInput = {
  name?: string
  description?: string
  disk?: string
  private?: boolean
}

export type UploadFile = Blob

export type DownloadableLinkData = {
  url: string
}

export type AttachmentUploadData = {
  url: string
}

export type SharedContentData = {
  id: string
  url: string
}

export type AttachmentDeleteData = AttachmentUploadData


export type AttachmentProxy = {
  //
}
