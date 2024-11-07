'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { useFileStore } from '@/store/fileStore';
import { motion } from 'framer-motion';

export default function FileDropzone() {
  const { files, setFiles } = useFileStore();
  const [boxHeight, setBoxHeight] = useState('h-64');

  useEffect(() => {
    if (files.length > 0) {
      const timer = setTimeout(() => {
        setBoxHeight('h-32');
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setBoxHeight('h-64');
    }
  }, [files.length]);

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
      <motion.div
        {...getRootProps()}
        animate={{ height: boxHeight === 'h-32' ? '8rem' : '16rem' }}
        transition={{ duration: 0.5 }}
        className={`relative z-10 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-indigo-400 bg-indigo-50/20 px-4 transition duration-500 hover:bg-indigo-200/30 ${
          isDragActive ? 'border-indigo-400 bg-indigo-100/80' : ''
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mb-4 h-10 w-10 text-indigo-500" />
        {isDragActive ? (
          <p className="text-center text-lg text-indigo-600">
            Drop your files here...
          </p>
        ) : (
          <p className="text-center text-lg text-indigo-600">
            Drag and drop files here or click to select
          </p>
        )}
      </motion.div>
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
