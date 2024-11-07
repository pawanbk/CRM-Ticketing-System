import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/file/";

const FileService = {
  download: async (id) => {
    if (!id) throw new Error("No Id provided");

    try {
      const res = await axios.get(API_URL + `download/${id}`, {
        responseType: "blob",
      });
      if (res.status === 200) {
        const disposition = res.headers['content-disposition']
        let filename = 'downloaded-file'

        if(disposition && disposition.includes('attachment')) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, ''); // remove quotes around filename if any
          }
        }

        if (res?.data) {
            const blob = new Blob([res.data])
            const url = URL.createObjectURL(blob);
            const element = document.createElement('a')
            element.href = url
            element.download = filename;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  },

  upload: async (file, ticketId) => {
    if(!file || !ticketId) throw new Error('No file or ticket provided')

    const res = axios.post(API_URL + `upload`)
  }
};

export default FileService;
