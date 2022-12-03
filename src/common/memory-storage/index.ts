import { Injectable } from "@nestjs/common";
import { IMemory } from "../interfaces/memory-storage.interface";


@Injectable()
export class MemoryStorage {
    public static memory: IMemory[]  = [];

    addToMemoryStorage(args: IMemory){
        const index = MemoryStorage.memory.findIndex((memo) => memo.key === args.key);
        
        if(index == -1)
            return (MemoryStorage.memory).push(args)

        MemoryStorage.memory[index].value.push(...args.value);
    }

    getMemoryByKey(key: string): IMemory {
        return MemoryStorage.memory.find((memo) => memo.key === key) 
    }
}