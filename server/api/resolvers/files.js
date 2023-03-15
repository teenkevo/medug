const { Storage } = require("@google-cloud/storage");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");

// set environment variables
dotenv.config();

const gc = new Storage({
  projectId: "welearned",
  credentials: {
    type: "service_account",
    project_id: "welearned",
    private_key_id: process.env.GCP_PRIVATE_KEY_ID,
    private_key: process.env.GCP_PRIVATE_KEY.split("\\n").join("\n"),
    client_email: "welearned@welearned.iam.gserviceaccount.com",
    client_id: "106436236340418363441",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.GCP_CLIENT_X509_CERT_URL,
  },
});

const bucketName = "welearned-bucket";

// a function to remove any white spaces in filenames
const removeWhiteSpaces = (name) => {
  return name.replace(/\s+/g, "-");
};

const mutations = {
  // general - upload file
  UploadFile: async (_, { file }) => {
    const { createReadStream, filename, mimetype } = await file;

    let sanitizedName = uuidv4() + "-" + removeWhiteSpaces(filename);

    console.log(sanitizedName);

    await new Promise((resolve, reject) =>
      createReadStream().pipe(
        gc
          .bucket(bucketName)
          .file(sanitizedName)
          .createWriteStream({
            // resumable: false,
            gzip: true,
          })
          .on("finish", () => {
            gc.bucket(bucketName)
              .file(sanitizedName)
              // make the file pubic
              .makePublic()
              .then(() => {
                resolve();
              });
          })
          .on("error", reject)
      )
    );
    return {
      fileId: uuidv4(),
      url: `https://storage.googleapis.com/${bucketName}/${sanitizedName}`,
      name: filename,
      type: mimetype,
      gcName: sanitizedName,
    };
  },
  RemoveFile: async (_, { gcName }) => {
    if (gcName) {
      await gc.bucket(bucketName).file(gcName).delete().catch(console.error);
      return {
        gcName,
      };
    } else {
      return {
        gcName,
      };
    }
  },
};

module.exports = {
  mutations,
};
