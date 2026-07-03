# MessageReportSchema


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [default to undefined]
**message** | [**MessageSchema**](MessageSchema.md) |  | [default to undefined]
**reporter** | [**UserSchema**](UserSchema.md) |  | [default to undefined]
**reason** | **string** |  | [default to undefined]
**created_at** | **string** |  | [default to undefined]
**is_processed** | **boolean** |  | [default to undefined]
**result** | **string** |  | [default to undefined]
**processed_at** | **string** |  | [default to undefined]

## Example

```typescript
import { MessageReportSchema } from './api';

const instance: MessageReportSchema = {
    id,
    message,
    reporter,
    reason,
    created_at,
    is_processed,
    result,
    processed_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
