import { expect } from 'chai';
import supertest from 'supertest';
import db from '../../models';
import app from '../../server';
import SpecSeeders from '../helpers/SpecSeeders';
import FakeData from '../helpers/SpecFakers';

const client = supertest.agent(app);