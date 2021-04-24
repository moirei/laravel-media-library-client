# Sync

The sync API is intented for reactive UI intengration.

Once instantiated, state such as the current working directory (CWD), items in the CWD, lodaing state, uploads/creates/updates and delets and auto binded.


```typescript
import { Media } from '@moirei/laravel-media-library-client'

const media = new Media();

const sync = media.sync
```

Main interfaces
* `cwd`: the current working directory. If updated, the `files` is automatically fetched and updated
* `files`: the files in the `cwd`. Automatically updated
* `files[i].loading`: set to `true` when updating/moving/delting an item
* `loading`: set to `true` when fetching `files`


## Files

```javascript

// IF location is not given in options, the cwd is used
sync.upload(upload, options)

// When updated, its option in `sync.files` is updated
sync.update(file, input)

// Added to `sync.files` if location is cwd and removed otherwise
sync.move(file, location)

// Removed from cwd if file is in `sync.files`
sync.delete(file, options)
```


## Folders

```javascript

// IF location is not given in options, the cwd is used
sync.folder.create('My Folder', options)

// When updated, its option in `sync.files` is updated
sync.folder.update(folder, input)

// Added to `sync.files` if location is cwd and removed otherwise
sync.folder.move(folder, location)

// Removed from cwd if folder is in `sync.files`
sync.folder.delete(folder, options)
```

## Vue Example

<<< @/docs/vue-examples/sync.vue
