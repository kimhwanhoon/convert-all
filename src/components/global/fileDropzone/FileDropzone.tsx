'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { useFileStore } from '@/store/fileStore';
import { motion } from 'framer-motion';

export default function FileDropzone() {
  const { setFiles } = useFileStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [
        '.png',
        '.jpg',
        '.jpeg',
        '.gif',
        '.bmp',
        '.tiff',
        '.webp',
        '.avif',
        '.heic',
      ],
    },
  });

  return (
    <div className="relative p-4">
      <div
        {...getRootProps()}
        className={`relative z-10 flex h-64 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-indigo-300 bg-indigo-50/80 bg-transparent px-4 transition hover:bg-indigo-100/80 ${
          isDragActive ? 'border-indigo-400 bg-indigo-100/80' : ''
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mb-4 h-10 w-10 text-indigo-500" />
        {isDragActive ? (
          <p className="text-center text-lg text-indigo-600">
            파일을 여기에 놓아주세요...
          </p>
        ) : (
          <p className="text-center text-lg text-indigo-600">
            파일을 드래그하여 놓거나 클릭하여 선택하세요
          </p>
        )}
      </div>
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          filter: ['blur(20px)', 'blur(30px)', 'blur(20px)'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="h-full w-full rounded-lg bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300" />
      </motion.div>
    </div>
  );
}
