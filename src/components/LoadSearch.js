import { Divider, Input } from 'antd';

function Search(props) {

    const { loadSearch, updateLoadSearch } = props;

  return (
    <div
    style={{
        width: '30%'
    }}>
      <Divider>Search</Divider>

      <label>Search</label>
      <Input value={loadSearch} type="text" onChange={updateLoadSearch} />
    </div>
  );
}

export default Search;