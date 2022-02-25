// import cloudinary from 'cloudinary';
import { fileUpload } from "../../helpers/fileUpload";

// cloudinary.config({ 
//     cloud_name: 'rocas87', 
//     api_key: '917522527141855', 
//     api_secret: 'YNd8FALt65wfSklUzvEGQWj8BQA',
//     secure: true
// });

describe('should test fileUpload', () => {
    
    xtest('should upload file and return the URL', async() => {
        
        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png')
        const url = await fileUpload(file)

        expect( typeof url ).toBe('string');

        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.png', '');
        await cloudinary.v2.api.delete_resources(`${imageId}`, {}, (error,result )=>{
            console.log(error,result);
        });
    })

    test('should return error', async() => {
        
        const file = new File([], 'foto.png')
        const url = await fileUpload(file)

        expect( url ).toBe( null );
    })
})

