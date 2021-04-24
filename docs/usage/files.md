# Files
When making changes to existing files, the `file` may be a string representing the file ID or a [File](/types.html#file) object.

## Upload File

Upload a [File](https://developer.mozilla.org/en-US/docs/Web/API/File).

Returns a [File](/types.html#file) item.

```javascript
const media_item = await media.upload(file)
```

### Upload with options

Specify [options](/types.html#upload-options) such as resource name, disk, etc.

```javascript
const options = {}
const media_item = await media.upload(file, options, (progress) => {
  console.log(`Uploaded ${progress}%`)
})
```

## Update File

Returns an updated [File](/types.html#file) item.

See [input](/types.html#update-input) options.

```javascript
const media_item = await media.update(file, input)
```

## Move File

The `location` **string** may be the destination folder ID or a path.

```javascript
const media_item = await media.move(file, location)
```

## Downloadable Links

Returns an updated [DownloadableLinkData](/types.html#downloadable-link-data) item.

The [options](/types.html#downloadable-link-options) argument is optional.

```javascript
const options = {}
const data = await media.downloadableLink(file, options)
```

## Share File

Returns an updated [SharedContent](/types.html#shared-content) item.

The [options](/types.html#share-options) argument is optional.

```javascript
const options = {}
const data = await media.share(file, options)
```

## Delete File

The [options](/types.html#deletes-options) argument is optional.

```javascript
const options = {}
const media_item = await media.delete(file, options)
```
