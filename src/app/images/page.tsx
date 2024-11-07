import FileDropzone from '@/components/global/fileDropzone/FileDropzone';
import { UploadedFIlesTable } from '@/components/global/fileDropzone/UploadedFIlesTable';
import { Main } from '@/components/global/Main';

export default function ImagePage() {
  return (
    <Main className="space-y-4">
      {/* Dropzone */}
      <FileDropzone />
      {/* Uploaded Files Table */}
      <UploadedFIlesTable />
    </Main>
  );
}
