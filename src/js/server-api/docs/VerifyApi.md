# VerifyApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**verifyEmailVerifyEmailPost**](#verifyemailverifyemailpost) | **POST** /verify/email | Verify Email|

# **verifyEmailVerifyEmailPost**
> any verifyEmailVerifyEmailPost()

��֤����

### Example

```typescript
import {
    VerifyApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VerifyApi(configuration);

let email: string; // (default to undefined)

const { status, data } = await apiInstance.verifyEmailVerifyEmailPost(
    email
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **email** | [**string**] |  | defaults to undefined|


### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

