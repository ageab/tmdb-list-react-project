export default function Search(props) {
  return (
    <>
      <input
        className='py-3 focus:outline-none px-4 rounded-lg w-full text-black'
        placeholder='Search ...'
        type='text'
        name='search'
        id='search'
        onChange={props.onChange}
      />
    </>
  );
}
