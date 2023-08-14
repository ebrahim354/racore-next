import React from 'react'
import axios from 'axios'
import { url, productsRoute } from '../../utils/urlProvider';

const initialState = {
  name: '', price: '', image: '',
}

class AddInventory extends React.Component {
  state = initialState
  clearForm = () => {
    this.setState(() => (initialState))
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }
  onImageChange = async (e) => {
    const file = e.target.files[0];
    this.setState({ image: file })
    // const storageUrl = await Storage.put('example.png', file, {
    //     contentType: 'image/png'
    // })
    // this.setState({ image: storageUrl  })
  }
  addItem = async () => {
    const { name, price, image } = this.state
    if (!name || !price  || !image) return;

    const data = new FormData();
		data.append('file', image);
		data.append('name', name);
    data.append('price', price);
    const config = {
	    headers: { Authorization: `Bearer ${window.localStorage.getItem('jwt')}` },
    };
    try{
      const res = await axios.post(url + productsRoute, data, config);
      console.log('upload res', res.data);
      this.clearForm()
    } catch(err){
      console.log(err);
    }
  }
  render() {
    const {
      name, price, image
    } = this.state
    return (
      <div>
        <h3 className="text-3xl">Add Item</h3>
        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-144">
            <form className="bg-white shadow-xs rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Item name
                </label>
                <input
                onChange={this.onChange}
                value={name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Item name" name="name" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                  Item price
                </label>
                <input
                onChange={this.onChange}
                value={price} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="Item price" name="price" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="item image">
                  Item image
                </label>
                <input
                  type="file"
                  onChange={(e) => this.onImageChange(e)}
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <button onClick={this.addItem} className="bg-primary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Add Item
                </button>
                <a onClick={this.clearForm} className="inline-block align-baseline font-bold text-sm" href="#">
                  Clear Form
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default AddInventory