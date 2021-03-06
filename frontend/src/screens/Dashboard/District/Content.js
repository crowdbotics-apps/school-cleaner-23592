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
  const [sortedData, setSortedData] = useState([]);
  const { districts: { loading, success, error, data } } = useSelector(({ district }) => district);
  const { admins: { loadingAdmins, adminSuccess, adminError, adminData } } = useSelector(({ admin }) => admin);
  useEffect(() => {
    dispatch(fetchDistricts());
    // dispatch(fetchAdmins());
  }, []);
  useEffect(() => {
    const sorteddata = data.sort((x, y) => x.id - y.id)
    setSortedData(sorteddata);
  }, [data])
  const [editedDistrict, setEditedDistrict] = useState({ id: '', name: '', logo: '', code: '' })
  const [selectedDistrict, setSelectedDistrict] = useState(0)
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
  const handleClick = (districtId) => {
    history.push(`/overview`, { districtId: districtId })
  }

  return (
    <React.Fragment>
      <div className="main-content w-100 p-4">
        <div className="district-holder">
          {
            sortedData?.length > 0 && sortedData?.map(district => {
              return (
                <District
                  key={district.id}
                  district={district}
                  selected={selectedDistrict}
                  onSelectDistrict={selectDistrict}
                  onEditDistrict={editFormHandler}
                  handleClick={() => handleClick(district.id)}
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
