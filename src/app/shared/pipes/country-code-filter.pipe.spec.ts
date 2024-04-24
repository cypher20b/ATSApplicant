import { CountryCodeFilterPipe } from './country-code-filter.pipe';

describe('CountryCodeFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new CountryCodeFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
