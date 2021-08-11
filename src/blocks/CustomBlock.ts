import type { Block } from "blockly";
import { BetterBlockly } from "../BetterBlockly";
import { BaseRestriction } from "../restrictions/BaseRestriction";

abstract class CustomBlock {
  id: string = 'com_leondrolio_customblock';
  block: Partial<Block>;
  restrictions: BaseRestriction[]

  constructor() {
    this.block = {}
    this.restrictions = []
  }

  defineBlock(this: Block): void {}

  toJavaScript(block: Block): string {
    throw new Error(`${this.id} JavaScript block is not implemented.`)
  }

  toPython(block: Block): string {
    throw new Error(`${this.id} Python block is not implemented.`)
  }

  toLua(block: Block): string {
    throw new Error(`${this.id} Lua block is not implemented.`)
  }

  toDart(block: Block): string {
    throw new Error(`${this.id} Dart block is not implemented.`)
  }

  toPhp(block: Block): string {
    throw new Error(`${this.id} PHP block is not implemented.`)
  }
}

export { CustomBlock };
