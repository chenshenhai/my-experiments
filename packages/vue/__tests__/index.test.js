// @ts-nocheck
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Btn from '../src/index'
import mountTest from './mount-test';

function asyncExpect(fn, timeout)  {
  return new Promise((resolve) => {
    if (typeof timeout === 'number') {
      setTimeout(() => {
        fn();
        resolve();
      }, timeout);
    } else {
      nextTick(() => {
        fn();
        resolve();
      });
    }
  });
}

describe('Test Vue', () => {
  mountTest(Btn);

  it('Test Btn Click', async () => {
    const DefaultButton = {
      data() {
        return {
          count: 0,
        }
      },
      // components: {
      //   btn: Btn,
      // },
      render() {
        return (
          <div>
            <div class="count">count:{this.count}</div>
            <Btn onClick={this.handleClick}>
              Add
            </Btn>
          </div>
        );
      },
      methods: {
        handleClick(){
          this.count += 1;
        }
      }
    };
    const wrapper = mount(DefaultButton, { sync: false });
    await asyncExpect(() => {
      wrapper.find('.btn').trigger('click');
    });
    await asyncExpect(() => {
      expect(wrapper.findAll('.btn').length).toBe(1);
      expect( wrapper.find('.count').text()).toBe('count:1');
    });
  });

})