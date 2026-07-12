# JaipurRide Android Keystore Details

This file contains the configuration and credentials for the new Android Upload Keystore generated on 2026-07-05.

> [!WARNING]
> This file contains private passwords for the upload key. Do not publish this file to a public GitHub repository.

## Keystore Configuration

- **Filename:** `jaipurride-upload.jks`
- **Location:** `android/app/jaipurride-upload.jks`
- **Key Alias:** `jaipurride`
- **Keystore Password:** `JpR_UploadKey_2026_Secured!`
- **Key Password:** `JpR_UploadKey_2026_Secured!`
- **Key Algorithm:** RSA 4096-bit
- **Validity:** 10,000 days (expires November 2053)

## Certificate Fingerprints

- **SHA-1:** `9F:27:A9:8E:71:E8:C7:54:98:3F:A3:16:42:05:0E:99:DC:74:CC:59`
- **SHA-256:** `61:A9:50:EF:FD:8B:DA:6F:ED:F1:C2:C7:FD:CC:D7:AB:6E:75:7F:A5:9B:F2:7D:1F:EE:B5:52:9F:B7:18:5F:73`
- **MD5:** `6A:7B:77:A5:87:17:8B:C5:07:2C:E1:52:64:E0:D4:4F`

---

## Google Play Console Upload Key Reset Guide

Since the old upload key from Median.co is lost, you must register this new upload key in the Google Play Console:

1. **Go to Google Play Console** and select your app: **JaipurRide**.
2. Navigate to **Setup** > **App integrity**.
3. Under **App signing**, click **Request upload key reset**.
4. Choose the reason: **"I lost my upload key"** or **"My upload key is compromised"**.
5. Upload the exported public certificate file:
   - **`upload_certificate.pem`** (or **`upload_certificate.der`** depending on Play Console prompt).
6. Click **Submit**.
7. Google Support will process the request (typically takes 1-2 business days) and send you an email confirmation indicating when the new upload key will become active.
