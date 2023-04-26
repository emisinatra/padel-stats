import { ChangeEvent, useState } from "react"
import styled from "styled-components"

const FileUploadButton = styled.label`
  background-color: ${({ theme }) => theme.colors.lime[600]};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: white;
  cursor: pointer;
  display: inline-block;
  font-size: 1rem;
  padding: 0.8rem 1rem;
  text-align: center;
  white-space: nowrap;
  margin-right: 1rem;
`

const FileName = styled.span`
  display: inline-block;
  margin-left: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
`

interface FileUploadProps {
  register: any
  name: string
  accept?: string
}

export const FileUpload: React.FC<FileUploadProps> = ({ register, name, accept }) => {
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    if (fileList) {
      setFileName(fileList[0]?.name || null)
    }
  }

  return (
    <div>
      <FileUploadButton htmlFor={`${name}-upload`}>Choose File</FileUploadButton>
      <input
        {...register(name)}
        id={`${name}-upload`}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {fileName && <FileName>{fileName}</FileName>}
    </div>
  )
}
