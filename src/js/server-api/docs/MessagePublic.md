# MessagePublic


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [default to undefined]
**content** | **string** |  | [default to undefined]
**author_id** | **number** |  | [default to undefined]
**author_account** | **string** |  | [default to undefined]
**author_avatar_url** | **string** |  | [optional] [default to undefined]
**likes** | **number** |  | [default to undefined]
**liked** | **boolean** |  | [optional] [default to false]
**dislikes** | **number** |  | [optional] [default to 0]
**disliked** | **boolean** |  | [optional] [default to false]
**images** | [**Array&lt;MessageImagePublic&gt;**](MessageImagePublic.md) |  | [optional] [default to undefined]
**comments** | [**Array&lt;CommentPublic&gt;**](CommentPublic.md) |  | [optional] [default to undefined]
**created_at** | **string** |  | [default to undefined]
**updated_at** | **string** |  | [default to undefined]

## Example

```typescript
import { MessagePublic } from './api';

const instance: MessagePublic = {
    id,
    content,
    author_id,
    author_account,
    author_avatar_url,
    likes,
    liked,
    dislikes,
    disliked,
    images,
    comments,
    created_at,
    updated_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
