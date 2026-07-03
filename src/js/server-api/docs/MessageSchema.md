# MessageSchema


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [default to undefined]
**content** | **string** |  | [default to undefined]
**author** | [**UserSchema**](UserSchema.md) |  | [default to undefined]
**likes** | **number** |  | [default to undefined]
**created_at** | **string** |  | [default to undefined]
**updated_at** | **string** |  | [default to undefined]
**liked** | **boolean** |  | [optional] [default to false]

## Example

```typescript
import { MessageSchema } from './api';

const instance: MessageSchema = {
    id,
    content,
    author,
    likes,
    created_at,
    updated_at,
    liked,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
