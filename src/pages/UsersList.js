import React,{useEffect,useState} from 'react'

const UsersList = () => {
        const [data, setData] = useState([]);
        console.log(data)
    
        const fetchInfo = async () => {
            await fetch('http://localhost:5253/api/Contacts')
                .then((res) => res.json())
                .then((d) => setData(d))
        }
    
        useEffect(() => {
            fetchInfo();
        }, []);
  return (
    <>
    <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Joined Date</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
        {data.map((value, key) => {
            return (
              <tr key={value.id}>
                <td>{value.name}</td>
                <td>{value.email}</td>
                <td>{value.joinedDate.split("T")[0]}</td>
                <td>{value.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  )
}

export default UsersList