Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update]
    resource :sessions, only: [:create, :destroy]
    resources :bookshelves, only: [:update, :create, :destroy, :index, :show]
    resources :books, only: [:index, :show, :create]

    get '/books/shelves/:bookshelf_id', to: "books#shelf", as: 'books_by_shelf'
    get '/books/search/:title', to: "books#search", as: 'book_search'
    get '/books/users/:user_id', to: "books#user", as: 'user_book_search'
    post '/books/google', to: "books#create_from_api", as: 'books_google'

    resources :shelvings, only: [:create, :update]

    delete '/shelvings/', to: "shelvings#destroy", as: 'api_shelvings'

    resources :statuses, only: [:update, :create, :destroy]

  end

end
