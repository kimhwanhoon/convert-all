'use client';

import { useFileStore } from '@/store/fileStore';
import { Checkbox, Progress, Button, Tooltip } from '@mantine/core';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';

export const UploadedFIlesTable = () => {
  const { files, setFiles } = useFileStore();
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [progressEmitted, setProgressEmitted] = useState(false);

  useEffect(() => {
    if (!progressEmitted && files.length > 0) {
      // 즉시 프로그레스 표시 및 시작
      setShowProgress(true);
      setProgress(0);

      // requestAnimationFrame을 사용하여 다음 프레임에서 프로그레스 시작
      requestAnimationFrame(() => {
        setProgress(100);
      });

      // 프로그레스 완료 후 숨기기
      const hideTimer = setTimeout(() => {
        setShowProgress(false);
        setProgressEmitted(true);
      }, 1000); // 전체 애니메이션 시간

      return () => clearTimeout(hideTimer);
    }
  }, [files.length, progressEmitted]);

  useEffect(() => {
    if (files.length === 0) {
      setShowProgress(false);
      setProgressEmitted(false);
    }
  }, [files.length]);

  const handleCheckboxChange = (index: string) => {
    setSelectedFiles((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleDeleteSelectedFiles = () => {
    setFiles(
      files.filter((_, index) => !selectedFiles.includes(index.toString()))
    );
    setSelectedFiles([]);
  };

  return (
    <>
      {/* 맨처음 파일이 업로드 되면 로딩바 진행 후 테이블 에니메이션 */}
      {files.length > 0 && showProgress && (
        <section className="p-2">
          <Progress
            size="sm"
            value={progress}
            classNames={{
              section:
                'bg-gradient-to-bl from-indigo-500/50 via-purple-500/50 to-pink-500/50 animate-pulse',
            }}
            transitionDuration={1000}
          />
        </section>
      )}

      {/* 업로드된 파일 테이블 */}
      {!showProgress && files.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="z-10 mt-4"
        >
          <div className="mb-2 flex items-center justify-between">
            {selectedFiles.length > 0 && (
              <Button
                leftSection={<Trash2 size={16} />}
                color="red"
                variant="light"
                size="sm"
                onClick={handleDeleteSelectedFiles}
              >
                Delete selected files ({selectedFiles.length})
              </Button>
            )}
          </div>
          <div className="overflow-x-auto rounded-lg border border-indigo-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-indigo-200">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-indigo-500">
                    <Tooltip
                      label={
                        selectedFiles.length === files.length
                          ? 'Deselect All'
                          : selectedFiles.length > 0 &&
                              selectedFiles.length < files.length
                            ? 'Deselect All'
                            : 'Select All'
                      }
                    >
                      <Checkbox
                        indeterminate={
                          selectedFiles.length > 0 &&
                          selectedFiles.length < files.length
                        }
                        checked={selectedFiles.length === files.length}
                        onChange={() => {
                          if (
                            selectedFiles.length === files.length ||
                            (selectedFiles.length > 0 &&
                              selectedFiles.length < files.length)
                          ) {
                            setSelectedFiles([]);
                          } else {
                            setSelectedFiles(files.map((_, i) => i.toString()));
                          }
                        }}
                        color="indigo"
                        radius="sm"
                      />
                    </Tooltip>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-indigo-500">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-indigo-500">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-indigo-500">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-200">
                {files.map((file, index) => (
                  <tr key={index} className="hover:bg-indigo-50/50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <Checkbox
                        value={index.toString()}
                        checked={selectedFiles.includes(index.toString())}
                        onChange={() => handleCheckboxChange(index.toString())}
                        color="indigo"
                        radius="sm"
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {file.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {/* 파일 크기 표시 
                      크기가 1MB 미만이면 KB로 표시, 1MB 이상이면 MB로 표시
                      KB일 때는 소수점 안 보이고, MB일 때는 소수점 둘째자리까지 보이게 표시
                      */}
                      {file.size / 1024 / 1024 < 1
                        ? `${(file.size / 1024).toFixed(0)} KB`
                        : `${(file.size / 1024 / 1024).toFixed(2)} MB`}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {file.type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      )}
    </>
  );
};
