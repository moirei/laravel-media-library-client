# Folders

When making changes to existing folders, the `folder` may be a string representing the folder ID or a [Folder](/types.html#folder) object.

## Create Folder

Returns a [Folder](/types.html#folder) item.

The `location` **string** may be the parent folder ID or a path.

The [options](/types.html#folder-create-options) argument is optional.

```javascript
const options = {}
const media_item = await media.folder.create('My Folder', options)
```

## Update Folder

Returns an updated [Folder](/types.html#folder) item.

See [input](/types.html#folder-update-input) options

```javascript
const media_item = await media.folder.update(folder, input)
```

## Move Folder

The `location` **string** may be the destination folder ID or a path.

```javascript
const media_item = await media.folder.move(folder, location)
```

## Share Folder

Returns an updated [SharedContent](/types.html#shared-content) item.

The [options](/types.html#share-options) argument is optional.

```javascript
const options = {}
const data = await media.folder.share(folder, options)
```

## Delete Folder

The [options](/types.html#deletes-options) argument is optional.

```javascript
const options = {}
const media_item = await media.folder.delete(folder, options)
```
