# Attachments

## Upload

Returns an [Attachment](/types.html#attachment) item.

Upload a [File](https://developer.mozilla.org/en-US/docs/Web/API/File) as attachment.

```javascript
const media_item = await media.attachment.upload(file)
```

## Purge

The `attachment` argument is the attachment url or ID.

```javascript
const options = {}
const media_item = await media.attachment.purge(attachment)
```
