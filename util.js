const aws = require('aws-sdk');


exports.deleteFile = (source) => {

    aws.config.update({
        accessKeyId: process.env.awsS3AccessKey,
        secretAccessKey: process.env.awsS3Secret,
        region: process.env.awsS3Region
    })
    const s3 = new aws.S3();

  const params = {
    Bucket: process.env.awsS3Bucket, 
    Key: source    
   };

   console.log('[deleteFile]', JSON.stringify(params) )

   return new Promise((res,rej) => {
       s3.deleteObject(params, function(err, data) {
         if(err) rej(err)

         console.log('[deleteFile]', JSON.stringify(err), ' - ' , JSON.stringify(data) )
         res(data)
       });
   })
}

exports.moveFile = (source, destination) => {

    const params = {        
        Bucket: process.env.awsS3TrashBin,
        CopySource: encodeURIComponent( process.env.awsS3Bucket + '/' + source),
        Key: destination        
    };
    console.log('[moveFile]', JSON.stringify(params) )

    aws.config.update({
        accessKeyId: process.env.awsS3AccessKey,
        secretAccessKey: process.env.awsS3Secret,
        region: process.env.awsS3Region
    })
    var s3 = new aws.S3();

    return new Promise((res, rej) => {
        s3.copyObject(params, function(err, data) {
            if(err) rej(err)

            console.log('[moveFile]', JSON.stringify(err), ' - ' , JSON.stringify(data) )
            res(data)
        });
    })
    
}