// selectedValueRef.ts
// useSelectedValueRef.ts
import { useRef } from 'react';

const useSelectedValueRef = () => {
    return useRef<string | null>(null);
};

export default useSelectedValueRef;

