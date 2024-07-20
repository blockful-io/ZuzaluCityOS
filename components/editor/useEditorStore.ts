import { OutputData } from '@editorjs/editorjs';
import { useState } from 'react';

export const ParseStringToOutputData = (string: string) => {
  return JSON.parse(string.replaceAll('\\"', '"')) as OutputData;
};

export const getOutputDataLength = (blocks: OutputData['blocks'] = []) => {
  return blocks
    .filter((block) => 'text' in block.data)
    .reduce((prev, current) => prev + current.data.text.length, 0);
};

export const useEditorStore = () => {
  const [value, setValue] = useState<OutputData>({
    time: 0,
    blocks: [],
    version: '2.22.2',
  });

  const [length, setLength] = useState<number>(0);

  return {
    value,
    setValue: (value: OutputData | string) => {
      const data =
        typeof value === 'string' ? ParseStringToOutputData(value) : value;

      setValue(data);
      setLength(getOutputDataLength(data.blocks));
    },
    length,
    setLength,
  };
};
