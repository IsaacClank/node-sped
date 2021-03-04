import { ITester } from 'prve';
import { cmdTester } from './testers/cmd';
import { fetchTester } from './testers/fetch';

const testSuit: ITester[] = [cmdTester, fetchTester];

testSuit.forEach(tester => tester.execute());
