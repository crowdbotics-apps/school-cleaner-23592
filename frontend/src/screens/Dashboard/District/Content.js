import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchDistricts } from '../../../modules/actions/DistrictActions';
import { fetchAdmins } from '../../../modules/actions/AdminActions';
import { fetchUsers } from '../../../modules/actions/UserActions';
import District from '../../../components/Dashboard/District';
import DistrictForm from '../../../components/Dashboard/DistrictForm';
import DistrictEditForm from '../../../components/Dashboard/DistrictEditForm';
import AdminList from '../../../components/Dashboard/AdminList';
import $ from 'jquery';

const Content = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { districts: { loading, success, error, data }} = useSelector(({ district }) => district);
  const { admins: { loadingAdmins, adminSuccess, adminError, adminData }} = useSelector(({ admin }) => admin);

  useEffect(() => {
    dispatch(fetchDistricts());
    // dispatch(fetchAdmins());
  }, []);

  const [ editedDistrict, setEditedDistrict] = useState({id: '', name: '', logo: '', code: ''})
  const [ selectedDistrict, setSelectedDistrict ] = useState(0)

  const selectDistrict = (id) => {
    let updatedDistrict = data.filter(district => district.id == id)[0]

    setSelectedDistrict(updatedDistrict.id)
    props.onDistrictSelected(updatedDistrict);
  }

  const editFormHandler = district => {
    setEditedDistrict({ id: district.id, name: district.name, logo: district.logo, code: district.code });
    $('#update_District').modal('show');
  };

  const formSubmitted = () => {
    dispatch(fetchDistricts());
  };

  return (
    <React.Fragment>
      <div className="main-content w-100 p-4">
        <div className="district-holder">
          {data.length > 0 && data.map(district => {
            return (
              <District 
                key={district.id}
                district={district} 
                selected={selectedDistrict}
                onSelectDistrict={selectDistrict} 
                onEditDistrict={editFormHandler}
              />
            ); 
          })}
        </div>
      </div>
      <DistrictForm />
      <DistrictEditForm district={editedDistrict} />
      <AdminList districtId={selectedDistrict} />
    </React.Fragment>
  )
}

export default Content;
