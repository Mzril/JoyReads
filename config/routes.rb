Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update]
    resource :sessions, only: [:create, :destroy]
    resources :bookshelves, only: [:update, :create, :destroy, :index, :show]
    resources :books, only: [:index, :show]
    get '/books/shelves/:bookshelf_id', to: "books#shelf", as: 'books_by_shelf'
  end

end
