import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../modules/actions/UserActions';
import { fetchAdmins, getDistricEmployees } from '../../modules/actions/AdminActions';
import { updateDistrict, fetchDistricts } from '../../modules/actions/DistrictActions';

const AdminList = (props) => {

  const dispatch = useDispatch();
  const { admins: { loading, success, error, data }} = useSelector(({ admin }) => admin);

  const [users, setUsers] = useState([]);

  const [selectedAdmins, setselectedAdmins] = useState([]);
  const [checkedValue, setCheckedValue] = useState(false);

  console.log('selectedAdmins', selectedAdmins);

  const handleChecked = () => {
    setCheckedValue(!checkedValue);
  }

  console.log('roleId', data);

  useEffect(() => {
    // dispatch(fetchAdmins());

    dispatch(fetchDistricts());
  }, []);


  const handleCheckboxChange = (event) => {
    let admins = selectedAdmins
    let adminId = event.target.checkedValue

    if(admins.includes(adminId)) {
      let index = admins.indexOf(adminId)
      admins.splice(index, 1)
      setselectedAdmins(admins)
    } else {
      admins.push(event.target.value)
      setselectedAdmins(admins)
    }
  }

  const saveHandler = (e) => {
    dispatch(updateDistrict({
      id: props.districtId, 
      admins: selectedAdmins
    }));
  };

  return(
    <div className="modal fade" id="add_admin" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-holder">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="admin-info m-4">
                {data.length > 0 && data.map(admin =>
                  <div className="d-flex items-center justify-content-between mb-4">
                    <div>{admin.employee_detail.name}</div>
                    <div>
                      <input type="checkbox" className="form-check-input big-checkbox" value={admin.employee_detail.id} onChange={handleCheckboxChange}/>
                    </div>
                  </div>
                )}
              </div>
              <div class="d-flex justify-content-center align-items-center btn-holder">
                <button type="button" class="btn btn-primary text-uppercase" data-bs-toggle="modal" data-bs-target="#add_admin" onClick={saveHandler}>Save</button>
                <button type="button" class="btn btn-primary text-uppercase" data-bs-toggle="modal" data-bs-target="#add_admin">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminList;
