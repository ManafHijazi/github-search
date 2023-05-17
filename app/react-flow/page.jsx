'use client';

import React, { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useReactFlow,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  ConnectionLineType,
} from 'reactflow';
import CustomNode from './CustomNode';
import { ButtonBase } from '@mui/material';
import 'reactflow/dist/style.css';
import './reactFlow.scss';

const initialNodes = [
  {
    id: '1',
    type: 'group',
    data: { label: 'First Node' },
    position: { x: 250, y: 5 },
    style: {
      width: 200,
      height: 160,
    },
  },
  {
    id: '2',
    data: { label: 'Second Node' },
    position: { x: 100, y: 300 },
  },
  {
    id: '3',
    data: { label: 'Third Node' },
    position: { x: 400, y: 300 },
  },
  {
    id: '4',
    data: { label: 'Forth Node' },
    position: { x: 400, y: 400 },
    type: 'custom',
    className: 'custom-node',
  },
  {
    id: 'a',
    type: 'input',
    data: { label: 'Child node 1' },
    position: { x: 10, y: 20 },
    parentNode: '1',
    extent: 'parent',
  },
  {
    id: 'b',
    data: { label: 'Child node 2' },
    position: { x: 40, y: 90 },
    parentNode: '1',
    extent: 'parent',
  },
];

const initialEdges = [
  { id: 'e1-2', source: 'a', target: '2', animated: false, label: 'To the' },
  { id: 'e1-3', source: 'b', target: '3', animated: true },
];

const nodeTypes = {
  custom: CustomNode,
};

const defaultEdgeOptions = {
  animated: true,
  type: 'smoothstep',
};

const minimapStyle = {
  height: 140,
};

let nodeId = 0;

const nodeColor = (node) => {
  switch (node.type) {
    case 'group':
      return '#6ede87';
    case 'output':
      return '#6865A5';
    case 'custom':
      return 'rgba(214, 213, 252, 0.531)';
    default:
      return '#ff0072';
  }
};

const FlowComponent = (props) => {
  const reactFlowInstance = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onAddNodeClickHandler = useCallback(() => {
    const id = `${++nodeId}`;

    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        label: `Node ${id}`,
      },
    };

    reactFlowInstance.addNodes(newNode);
  }, []);

  return (
    <>
      <div className='add-node-btn-wrapper'>
        <ButtonBase onClick={onAddNodeClickHandler} className='btns theme-solid'>
          <span className='mdi mdi-plus pr-2' />
          Add Node
        </ButtonBase>
      </div>

      <div className='flow-content'>
        <ReactFlow
          fitView
          nodes={nodes}
          edges={edges}
          selectionOnDrag
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineType={ConnectionLineType.SmoothStep}>
          <Controls />
          <MiniMap nodeColor={nodeColor} style={minimapStyle} zoomable pannable />
          <Background variant='cross' color='#aaa' gap={12} size={2} />
        </ReactFlow>
      </div>
    </>
  );
};

const ReactFlowComponent = () => {
  return (
    <div className='flow-wrapper'>
      <ReactFlowProvider>
        <FlowComponent />
      </ReactFlowProvider>
    </div>
  );
};

export default ReactFlowComponent;
