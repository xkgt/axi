# User


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**account** | **string** |  | [default to undefined]
**email** | **string** |  | [default to undefined]
**id** | **number** |  | [default to undefined]
**hashed_password** | **string** |  | [default to undefined]
**is_active** | **boolean** |  | [optional] [default to true]
**is_deleted** | **boolean** |  | [optional] [default to false]
**is_ban** | **boolean** |  | [optional] [default to false]
**avatar_url** | **string** |  | [optional] [default to undefined]
**avatar_path** | **string** |  | [optional] [default to undefined]
**created_at** | **string** |  | [optional] [default to undefined]
**updated_at** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { User } from './api';

const instance: User = {
    account,
    email,
    id,
    hashed_password,
    is_active,
    is_deleted,
    is_ban,
    avatar_url,
    avatar_path,
    created_at,
    updated_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
