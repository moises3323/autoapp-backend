import { Storage } from "@google-cloud/storage";
import multer from "multer";
import yenv from "yenv";
import path from "path";

const env = yenv();
const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"];

//GCP INSTANCE
const storage = new Storage({
  projectId: env.GCLOUD.PROJECT_ID,
  keyFilename: env.GCLOUD.GCLOUD_APP_CREDENTIALS,
});

// Select bucket
const bucket = storage.bucket(env.GCLOUD.BUCKET_NAME);

// Process files
const multerMiddleware = (fieldName) =>
  multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: env.GCLOUD.FILE_SIZE * 1024 * 1024, // file max size
    },
    fileFilter: (req, file, cb) => {
      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // allow file
      } else {
        const error = new Error("Invalid file type");
        error.status = 400;
        cb(error);
      }
    },
  }).single(fieldName);

// Upload file to Google Cloud Storage
export const uploadToBucketGCS = ({
  fieldName,
  required = true,
  passValidation,
  addFieldName = false,
}) => {
  const _multerMiddleware = multerMiddleware(fieldName);

  return (req, res, next) =>
    _multerMiddleware(req, res, async function (err) {
      if (passValidation && !passValidation(req)) {
        return next();
      }
      if (err) {
        return next(err);
      }
      if (!req.file) {
        if (!required) return next();
        const err = new Error("No file selected");
        err.status = 400;
        return next(err);
      }
      // Create a new blob in the bucket and upload the file data.
      const filename = Date.now() + path.extname(req.file.originalname);
      const blob = bucket.file(filename);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
          cacheControl: "public, max-age=31536000",
        },
        gzip: true,
        resumable: true,
      });

      blobStream.on("error", (err) => {
        next(err);
      });

      blobStream.on("finish", () => {
        // const publicUrl = `${env.GCLOUD.GCS_URL}/${bucket.name}/${blob.name}`;
        if(addFieldName) req.body[fieldName] = blob.name;
        res.locals.fileMetadata = {
          name: req.file.originalname,
          size: req.file.size,
          cloud_name: blob.name,
        };
        next();
      });

      blobStream.end(req.file.buffer);
    });
};
