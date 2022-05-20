export {
    type FahrradArt,
    type Fahrrad,
    type FahrradShared,
    type Marke,
    MAX_GEWICHT,
} from './fahrrad';
export {
    FahrradReadService,
    type FahrraederServer,
    type Suchkriterien,
} from './fahrradRead.service';
export { FahrradWriteService } from './fahrradWrite.service';
export { FindError, SaveError, UpdateError, RemoveError } from './errors';
