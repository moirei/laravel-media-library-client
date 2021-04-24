# Usage



## Installation

```bash
npm i @moirei/laravel-media-library-client
```



## Configuration

```typescript
import { Media } from '@moirei/laravel-media-library-client'

// Use internal defaults
const media = new Media();

// Provide defaults
const media = new Media({
  baseURL: 'http://myappdomain.com/media-library',
  headers: {},
  forceDeletes: true,
});

// Provide an axios instance
const media = new Media({
  axios: require('axios').default,
  forceDeletes: true,
});
```

## Browse Files
The `browse` method returns a list of files and folders in a given path

```typescript
const items = await media.browse('/products');
```

