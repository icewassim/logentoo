import zipCodeRepo from '../models/zip.model';

export const findByTerm = term => {
  return zipCodeRepo.find({
    zipCode: new RegExp(term, 'i'),
  });
}
