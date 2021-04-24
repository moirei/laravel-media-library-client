<template>
  <div>
    <v-text-field label="CWD" v-model="media.cwd" />

    <div v-if="media.loading">
      Loading Library...
    </div>
    <div v-else>
      <div v-for="item in media.files" :key="item.id">
        <div v-if="item.loading">
          Loading...
        </div>
        <div v-else>
          <h2>{{ item.name }}</h2>
          <small>Type: {{ item.type }}</small>
          <p>
            <button @click="share">Share</button>
            <button @click="rename(item)">Rename</button>
            <button @click="del(item)">Delete</button>
          </p>
        </div>
      </div>
    </div>

    <button @click="openUpload">Upload</button>
    <input ref="file" type="file" hidden multiple @change="upload" />
  </div>
</template>

<script>
import { Media } from '@moirei/laravel-media-library-client'

const media = new Media({
  baseURL: 'http://127.0.0.1:8000/media-library',
  forceDeletes: true,
})

export default {
  data: () => ({
    media: media.sync,
  }),
  methods: {
    openUpload() {
      this.$refs.file.click()
    },
    async upload({ target: { files = [] } }){
      return this.media.upload(files[0])
    },
    async share(item){
      const options = {
        public: false,
        access_emails: [
          'augustusokoye@moirei.com'
        ],
        access_keys: [
          'moirei'
        ]
      }
      if(item.type == 'folder'){
        const { url } = await media.folder.share(item, options)
        console.log('Shareable link', url)
        alert(url)
      }else{
        const { url } = await media.share(item, options)
        console.log('Shareable link', url)
        alert(url)
      }
    },
    move(item){
      if(item.type == 'folder'){
        this.media.folder.move(item, 'Products')
        // this.media.folder.move(item, '/')
      }else{
        this.media.move(item, 'Products')
        // this.media.move(item, '/')
      }
      this.media.fresh()
    },
    rename(item){
      if(item.type == 'folder'){
        this.media.folder.update(item, {
          name: 'Updated Folder Name'
        })
      }else{
        this.media.update(item, {
          name: 'Updated File Name'
        })
      }
    },
    del(item){
      if(item.type == 'folder'){
        this.media.folder.delete(item)
      }else{
        this.media.delete(item)
      }
    },
  }
}
</script>
