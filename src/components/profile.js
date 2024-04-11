import React from 'react';
import useProfile from '../hooks/useProfile';
import useLogout from '../hooks/useLogout'; // Importamos el hook useLogout

export const Profile = () => {
  const { profile, loading } = useProfile();
  const { loading: logoutLoading, logout } = useLogout();

  if (loading || logoutLoading) {
    return <div>Cargando perfil...</div>;
  }

  if (!profile) {
    return <div>Error al cargar el perfil</div>;
  }

  const handleButtonClick = () => {
    window.location.href = "/file-upload";
  };

  const { payload } = profile;
  const { username, email, cart } = payload;

  const handleLogout = async () => {
    await logout(); 
    window.location.href = "/";
  };

  return (
    <section>
      <div>
        <h2>Perfil de usuario</h2>
        <p><strong>Nombre de usuario:</strong> {username}</p>
        <p><strong>Correo electrónico:</strong> {email}</p>
        <p><strong>Cart:{cart}</strong></p>
      </div>

      <div>
        <h3>Cargar documetación</h3>
        <button onClick={handleButtonClick}>Formulario</button>
      </div>

      <div>
        <h3>Desloguear</h3>
        <button onClick={handleLogout}>Cerrar sesión</button> {/* Botón para desloguear */}
      </div>
    </section>
  );
};

export default Profile;