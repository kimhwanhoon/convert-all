import { ConvertOptions } from '@/components/global/fileDropzone/ConvertOptions';
import FileDropzone from '@/components/global/fileDropzone/FileDropzone';
import { UploadedFIlesTable } from '@/components/global/fileDropzone/UploadedFIlesTable';
import { Main } from '@/components/global/Main';

export default function HomePage() {
  return (
    <Main className="space-y-4">
      {/* Dropzone */}
      <FileDropzone />
      {/* Uploaded Files Table */}
      <UploadedFIlesTable />
      {/* Convert Options */}
      <ConvertOptions type="image" />
    </Main>
  );
}
