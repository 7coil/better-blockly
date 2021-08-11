import type Blockly from 'blockly';
import type { Workspace, WorkspaceSvg } from 'blockly';
import type Dart from 'blockly/dart';
import type JavaScript from 'blockly/javascript';
import type Lua from 'blockly/lua';
import type Php from 'blockly/php';
import type Python from 'blockly/python';
import { CustomBlock } from './blocks/CustomBlock';

interface LanguageHandlers {
  javascript?: typeof JavaScript
  python?: typeof Python
  lua?: typeof Lua
  dart?: typeof Dart
  php?: typeof Php
}

class BetterBlockly {
  workspace?: WorkspaceSvg;
  blockly: typeof Blockly;
  languageHandlers: LanguageHandlers;
  customBlocks: CustomBlock[];

  animationFrameNumber?: number;

  constructor(blockly: typeof Blockly, languageHandlers: LanguageHandlers = {}) {
    this.blockly = blockly;
    this.languageHandlers = languageHandlers;
    this.customBlocks = [];
  }

  resize() {
    if (this.workspace) this.blockly.svgResize(this.workspace)

    this.animationFrameNumber = requestAnimationFrame(this.resize)
  }

  inject(workspace: HTMLDivElement, blocklyOptions: Blockly.BlocklyOptions) {
    this.workspace = this.blockly.inject(workspace, blocklyOptions);
    
    requestAnimationFrame(this.resize)

    this.workspace.addChangeListener((e: any) => {
      if (!this.workspace) throw new Error('Workspace change listener not destroyed properly.')

      switch(e.type) {
        case 'drag':
        case 'move':
        case 'create':
          const allBlocks = this.workspace.getAllBlocks(false);
          for (const block of allBlocks) {
            // Check if this block is a custom block added by BetterBlockly
            const customBlock = this.customBlocks.find(customBlock => customBlock.id === block.type);
            if (!customBlock) continue;

            const errors = [];

            // Validate this block
            for (const restriction of customBlock.restrictions) {
              const passed = restriction.check(block, allBlocks)

              if (!passed) {
                errors.push(restriction.message);
              }
            }

            if (errors.length) {
              block.setWarningText(errors.join('\n'))
            } else {
              // TODO: Fix upstream to accept null.
              block.setWarningText(null as unknown as string);
            }
          }
      }
    })
  }

  importBlock(block: CustomBlock) {
    this.customBlocks.push(block);
    this.blockly.Blocks[block.id] = { init: block.defineBlock }
    if (this.languageHandlers.javascript) this.languageHandlers.javascript[block.id] = block.toJavaScript;
    if (this.languageHandlers.python) this.languageHandlers.python[block.id] = block.toPython;
    if (this.languageHandlers.lua) this.languageHandlers.lua[block.id] = block.toLua;
    if (this.languageHandlers.dart) this.languageHandlers.dart[block.id] = block.toDart;
    if (this.languageHandlers.php) this.languageHandlers.php[block.id] = block.toPhp;
  }

  destroy() {
    this.workspace?.dispose();
    if (this.animationFrameNumber) cancelAnimationFrame(this.animationFrameNumber)
  }

  export(language: keyof LanguageHandlers) {
    return this.languageHandlers[language]?.workspaceToCode(this.workspace)
  }
}

export {
  BetterBlockly
};
