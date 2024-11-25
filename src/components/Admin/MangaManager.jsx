import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, Search, Upload, X, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { db, storage } from '../../lib/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  query,
  orderBy 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';

const MangaManager = () => {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentManga, setCurrentManga] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    chapters: 0,
    status: 'ongoing',
    genre: '',
    coverFile: null,
    pdfFile: null
  });

  useEffect(() => {
    fetchMangas();
  }, []);

  const fetchMangas = async () => {
    try {
      const mangasQuery = query(collection(db, 'mangas'), orderBy('title'));
      const snapshot = await getDocs(mangasQuery);
      const mangaList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMangas(mangaList);
    } catch (error) {
      console.error('Error fetching mangas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file, path) => {
    if (!file) return null;
    
    const fileRef = ref(storage, `${path}/${Date.now()}-${file.name}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const mangaData = {
        title: formData.title,
        description: formData.description,
        chapters: Number(formData.chapters),
        status: formData.status,
        genre: formData.genre,
        updatedAt: new Date().toISOString()
      };

      if (formData.coverFile) {
        mangaData.coverUrl = await handleFileUpload(
          formData.coverFile, 
          'covers'
        );
      }

      if (formData.pdfFile) {
        mangaData.pdfUrl = await handleFileUpload(
          formData.pdfFile, 
          'mangas'
        );
      }

      if (currentManga) {
        // Update existing manga
        await updateDoc(doc(db, 'mangas', currentManga.id), mangaData);
      } else {
        // Create new manga
        mangaData.createdAt = new Date().toISOString();
        await addDoc(collection(db, 'mangas'), mangaData);
      }

      resetForm();
      fetchMangas();
    } catch (error) {
      console.error('Error saving manga:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (manga) => {
    if (!window.confirm('Tem certeza que deseja excluir este mangá?')) return;

    setLoading(true);
    try {
      // Delete files from Storage
      if (manga.coverUrl) {
        const coverRef = ref(storage, manga.coverUrl);
        await deleteObject(coverRef);
      }
      if (manga.pdfUrl) {
        const pdfRef = ref(storage, manga.pdfUrl);
        await deleteObject(pdfRef);
      }

      // Delete document from Firestore
      await deleteDoc(doc(db, 'mangas', manga.id));
      fetchMangas();
    } catch (error) {
      console.error('Error deleting manga:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (manga) => {
    setCurrentManga(manga);
    setFormData({
      title: manga.title,
      description: manga.description,
      chapters: manga.chapters,
      status: manga.status,
      genre: manga.genre,
      coverFile: null,
      pdfFile: null
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      chapters: 0,
      status: 'ongoing',
      genre: '',
      coverFile: null,
      pdfFile: null
    });
    setCurrentManga(null);
    setIsEditing(false);
  };

  const filteredMangas = mangas.filter(manga =>
    manga.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-manga text-white">Gerenciar Mangás</h2>
        {!isEditing && (
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            <PlusCircle className="h-5 w-5 mr-2" />
            Adicionar Novo
          </Button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-secondary-dark p-6 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white mb-2">Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-2 bg-secondary rounded text-white"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2">Gênero</label>
              <input
                type="text"
                value={formData.genre}
                onChange={(e) => setFormData({...formData, genre: e.target.value})}
                className="w-full p-2 bg-secondary rounded text-white"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2">Capítulos</label>
              <input
                type="number"
                value={formData.chapters}
                onChange={(e) => setFormData({...formData, chapters: e.target.value})}
                className="w-full p-2 bg-secondary rounded text-white"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full p-2 bg-secondary rounded text-white"
              >
                <option value="ongoing">Em andamento</option>
                <option value="completed">Completo</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Descrição</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-2 bg-secondary rounded text-white h-32"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white mb-2">Capa</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({...formData, coverFile: e.target.files[0]})}
                className="w-full p-2 bg-secondary rounded text-white"
              />
            </div>
            <div>
              <label className="block text-white mb-2">PDF do Mangá</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFormData({...formData, pdfFile: e.target.files[0]})}
                className="w-full p-2 bg-secondary rounded text-white"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={resetForm}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      ) : (
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar mangás..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-secondary rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      )}

      <div className="space-y-4">
        {filteredMangas.map((manga) => (
          <div key={manga.id} className="flex items-center space-x-4 bg-secondary-dark p-4 rounded-lg">
            {manga.coverUrl && (
              <img
                src={manga.coverUrl}
                alt={manga.title}
                className="w-16 h-24 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h3 className="text-white font-medium">{manga.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                <span>{manga.chapters} capítulos</span>
                <span>Gênero: {manga.genre}</span>
                <span className="capitalize">
                  {manga.status === 'ongoing' ? 'Em andamento' : 'Completo'}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleEdit(manga)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-500 hover:text-red-400"
                onClick={() => handleDelete(manga)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MangaManager;