import React, { useEffect, useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import "filepond/dist/filepond.min.css";
import FileService from '../../api/FileService';
import TicketService from '../../api/TicketServices';

const Upload = (props) => {
    const [file, setFile] = useState();
    const API_URL = process.env.REACT_APP_API_URL + "/file/upload";

    const [attachments, setAttachments] = useState(props.attachments || [])


    const downloadFile = async (id) => {
        if (!id) return
        await FileService.download(id)
    }

   const fetchAttachments = async() => {
        const results = await TicketService.getAttachments(props.ticket)
        if(results && results.attachments) {
            setAttachments([...results.attachments]);
        }
   }
   
    return (
        <div>
            <FilePond
                files={file}
                onupdatefiles={setFile}
                allowMultiple={false}
                maxFiles={1}
                server={{
                    process:{
                        method: "POST",
                        url: API_URL,
                        ondata: (data) =>{
                            data.append('ticketId', props.ticket)
                            return data
                        }
                    }
                }}
                onprocessfile = {(error, file) => {
                    if(!error) {
                        fetchAttachments()
                    }
                }}
                name="file"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
            {attachments && attachments.map((attachment) =>
                <li key={attachment?._id || attachment?.name}>
                    {attachment?.name}
                    <span style={{ marginLeft: '10px', color: 'var(--link)' }} onClick={() => downloadFile(attachment?._id)}>
                        Download
                    </span>
                </li>
            )}
        </div>
    )
}

export default Upload