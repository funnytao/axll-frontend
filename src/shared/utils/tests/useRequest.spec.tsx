import nock from 'nock';
import { act, renderHook } from '@testing-library/react-hooks'
import useRequest from '../useRequest';
import { AxiosResponse } from 'axios';

describe('(Function) useRequest', () => {
  it('should be able to return a promise that fetch data with GET', async () => {
    const baseConfig = {
      url: '/test/url',
      method: 'GET'
    };

    nock(/./).get('/test/url').reply(200, { message: 'some data' });
    const { result, waitForNextUpdate } = renderHook(() => useRequest(baseConfig));
    act(() => {
      result.current.request()
    });
    expect(result.current.loading).toBeTruthy();
    await waitForNextUpdate();
    expect((result.current.data as AxiosResponse).data).toEqual({ message: 'some data' });
  });

  it('should be able to return a promise that fetch data with POST', async () => {
    const baseConfig = {
      url: '/test/url',
      method: 'POST'
    };

    nock(/./).post('/test/url').reply(200, { message: 'some data' });
    const { result, waitForNextUpdate } = renderHook(() => useRequest(baseConfig));
    act(() => {
      result.current.request({ data: { data: 'some data' } })
    });
    expect(result.current.loading).toBeTruthy();
    await waitForNextUpdate();
    expect((result.current.data as AxiosResponse).data).toEqual({ message: 'some data' });
  });
});