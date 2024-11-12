'use client';

import { handleConvertImages } from '@/lib/convert/handleConvertImages';
import { useFileStore } from '@/store/fileStore';
import {
  icoSizes,
  imageFormats,
  normalRatios,
} from '@/types/convertOptions/images';
import { Accordion, Button } from '@mantine/core';
import { NumberInput, Select, Slider } from '@mantine/core';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ConvertOptionsProps {
  type: 'image' | 'video';
}

export const ConvertOptions = ({ type }: ConvertOptionsProps) => {
  const { files } = useFileStore(),
    [isLoading, setIsLoading] = useState(false),
    [showOptions, setShowOptions] = useState(false),
    [width, setWidth] = useState<number | ''>(''),
    [height, setHeight] = useState<number | ''>(''),
    [selectedRatio, setSelectedRatio] = useState<string | null>(null),
    [selectedIcoSize, setSelectedIcoSize] = useState<string | null>(null),
    [quality, setQuality] = useState(80),
    [format, setFormat] = useState<string | null>(null),
    [isIco, setIsIco] = useState(false);

  useEffect(() => {
    if (files.length > 0) {
      const timer = setTimeout(() => {
        setShowOptions(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowOptions(false);
    }
  }, [files.length]);

  // 맨 처음 isIco가 true인 경우 너비와 높이를 32로 설정
  useEffect(() => {
    if (isIco) {
      setWidth(32);
      setHeight(32);
    }
  }, [isIco]);

  // 비율이 선택되었을 때 높이 자동 조정
  useEffect(() => {
    if (selectedRatio && width) {
      const ratio = parseFloat(selectedRatio);
      const calculatedHeight = Math.round((Number(width) / ratio) * 100) / 100;
      setHeight(Math.round(calculatedHeight));
    }
  }, [selectedRatio, width]);

  // 너비가 변경될 때 선택된 비율에 맞춰 높이 자동 조정
  const handleWidthChange = (value: string | number) => {
    setWidth(value as number | '');
    if (selectedRatio && value !== '') {
      const ratio = parseFloat(selectedRatio);
      const calculatedHeight = Math.round((Number(value) / ratio) * 100) / 100;
      setHeight(Math.round(calculatedHeight));
    }
  };

  // 높이가 변경될 때 선택된 비율에 맞춰 너비 자동 조정
  const handleHeightChange = (value: string | number) => {
    setHeight(value as number | '');
    if (selectedRatio && value !== '') {
      const ratio = parseFloat(selectedRatio);
      const calculatedWidth = Math.round(Number(value) * ratio * 100) / 100;
      setWidth(Math.round(calculatedWidth));
    }
  };

  if (files.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={showOptions ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="rounded-lg border border-indigo-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium text-indigo-900">
          Image Conversion Options
        </h3>

        <div className="space-y-6">
          {/* 이미지 포맷 선택 */}
          <div className="space-y-2">
            <Select
              label="Output Format"
              description="Choose the format you want to convert to."
              data={imageFormats}
              value={format}
              onChange={(value) => {
                if (value === 'ico') {
                  setIsIco(true);
                  setSelectedRatio('1');
                } else {
                  setIsIco(false);
                  setSelectedRatio(null);
                }
                setFormat(value);
              }}
              placeholder="Select format"
              className="max-w-xs"
            />
          </div>

          {/* Advanced Options */}
          <Accordion variant="filled">
            <Accordion.Item value="advanced option">
              <Accordion.Control>
                {isIco ? 'Advanced ICO Options' : 'Advanced Options'}
              </Accordion.Control>
              <Accordion.Panel>
                <div className="space-y-6">
                  {/* Image Quality Settings */}
                  {!isIco && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Image Quality
                      </label>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-gray-500">
                          Default: 80% (better quality = larger file size)
                        </span>
                        <Slider
                          value={quality}
                          onChange={setQuality}
                          marks={[
                            { value: 20, label: '20%' },
                            { value: 50, label: '50%' },
                            { value: 80, label: '80%' },
                            { value: 100, label: '100%' },
                          ]}
                          defaultValue={80}
                          className="max-w-md"
                        />
                      </div>
                    </div>
                  )}

                  {/* 이미지 크기 조정 */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Resize Image
                    </label>
                    <div className="flex gap-4">
                      <NumberInput
                        placeholder="Width"
                        label="Width (px)"
                        className="w-32"
                        value={width}
                        onChange={handleWidthChange}
                        disabled={isIco}
                      />
                      <NumberInput
                        placeholder="Height"
                        label="Height (px)"
                        className="w-32"
                        value={height}
                        onChange={handleHeightChange}
                        disabled={isIco}
                      />
                      {isIco ? (
                        <Select
                          label="ICO Size"
                          placeholder="Select size"
                          value={selectedIcoSize}
                          onChange={(value) => {
                            setSelectedIcoSize(value);
                            setWidth(Number(value));
                            setHeight(Number(value));
                          }}
                          className="w-40"
                          data={icoSizes}
                        />
                      ) : (
                        <Select
                          label="Aspect Ratio"
                          placeholder="Select ratio"
                          value={selectedRatio}
                          onChange={setSelectedRatio}
                          className="w-40"
                          data={normalRatios}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>

          {/* 변환 버튼 */}
          <Button
            loading={isLoading}
            fullWidth
            size="md"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
            onClick={async () => {
              const options = {
                format,
                quality,
                width: Number(width),
                height: Number(height),
                ratio: selectedRatio,
              };
              console.log(options);
              await handleConvertImages(setIsLoading, files, options);
            }}
          >
            {files.length === 1 ? 'Convert Image' : 'Convert Images'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
