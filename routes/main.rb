class App < Sinatra::Application

  PER_PAGE = 10

  get '/' do
    if authenticated?
      dataset = Link.with_starred(current_user)

      @total = dataset.count

      dataset = dataset.reverse_order(:created_at).paginate(1, PER_PAGE)

      @links = dataset.all

      @pagination = {
        :total => @total,
        :currentPage => dataset.current_page,
        :pageCount => dataset.page_count,
        :perPage => PER_PAGE,
        :nextPage => dataset.next_page,
        :prevPage => dataset.prev_page,
        :firstPage => dataset.first_page?,
        :lastPage => dataset.last_page?,
        :start => 1,
        :end => (@total < PER_PAGE ? @total : PER_PAGE)
      }
    end
    slim :app
  end
end