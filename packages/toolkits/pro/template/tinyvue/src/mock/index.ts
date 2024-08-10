import {createMockServer} from '@gaonengwww/mock-server';
import list from './list';
import froms from '../views/form/step/mock';
import profile from './profile';
import board from './board';

let mockData = [] as any
for(let i=0; i<board.length; i+=1){
  mockData.push(board[i])
}
for(let i=0; i<list.length; i+=1){
  mockData.push(list[i])
}
for(let i=0; i<froms.length; i+=1){
  mockData.push(froms[i])
}
for(let i=0; i<profile.length; i+=1){
  mockData.push(profile[i])
}

createMockServer({
  mocks: mockData,
})

