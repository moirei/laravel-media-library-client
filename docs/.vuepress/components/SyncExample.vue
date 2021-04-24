<template>
  <div>
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">

    <div class="relative h-20 mb-5 border border-gray-400 rounded-sm">
      <input v-model="media.cwd" class="h-full w-full border-gray-300 px-2 transition-all border-blue rounded-sm"/>
      <label for="email" class="absolute left-2 transition-all bg-white px-1">Path</label>
    </div>
    <p>cwd: {{ media.cwd }}</p>

    <v-text-field label="CWD" v-model="media.cwd" />
    <div v-if="media.loading">
      Loading...
    </div>
      <!-- <div>
        <h2>{{ item.name }}</h2>
        <small>Type: {{ item.type }}</small>
        <p>
          <v-btn @click="share">Share</v-btn>
          <v-btn @click="rename(item)">Delete</v-btn>
        </p>
      </div> -->
    <div class="row justify-center mt-10">
      <div v-for="item in media.files" :key="item.id" @click="handle(item)" class="cols-1">
          <div class="relative py-2 px-6 rounded-md w-64 my-4 shadow-md">
            <p class="text-xl font-semibold my-2">{{ item.name }}</p>
            <div class="flex space-x-2 text-gray-400 text-sm">{{ item.type }}</div>
            <div class="border-t-2 my-2"></div>

            <div class="flex justify-start">
              <button class="px-3 py-1 rounded-md shadow">Update</button>
              <button class="px-3 py-1 ml-2 rounded-md shadow">Delete</button>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Media } from '../../../build'

const media = new Media({
  baseURL: 'http://127.0.0.1:8000/media-library',
  forceDeletes: true,
})

export default {
  data: () => ({
    media: media.sync,
  }),
  methods: {
    handle(item){
      if(item.type == 'folder'){
        this.media.cwd = `${this.media.cwd}/${item.name}`.replace(/^\/+([\w\/]+?)\/+$/, "")
      }
    },
    async upload(file){
      return this.media.upload(file)
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
  },
}
</script>
