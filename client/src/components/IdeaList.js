import IdeasApi from '../../services/IdeasApi';

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector('#idea-list');
    console.log(this._ideaListEl);
    this._ideas = [];
    this.getIdeas();

    this._validTags = new Set();
    this._validTags.add('technology');
    this._validTags.add('software');
    this._validTags.add('business');
    this._validTags.add('education');
    this._validTags.add('health');
    this._validTags.add('inventions');
  }

  addEventListeners() {
    this._ideaListEl.addEventListener('click', (e) => {
      console.log(e.target);
      if (e.target.classList.contains(`fa-times`)) {
        e.stopImmediatePropagation();
        console.log(e.target.parentElement.parentElement);
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        console.log(ideaId);

        this.deleteIdea(ideaId);
      }
    });
  }

  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data;
      this.render();
      console.log(this._ideas);
    } catch (error) {}
  }

  async deleteIdea(ideaId) {
    try {
      //delete from server
      const res = await IdeasApi.deleteIdea(ideaId);

      //delete from the dom
      this._ideas.filter((idea) => idea._id !== ideaId);
      this.getIdeas();
    } catch (error) {
      alert('You can not delete this resource.');
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = '';
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    }

    return tagClass;
  }

  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        const deleteBtn =
          idea.username === localStorage.getItem('username')
            ? `<button class="delete"><i class="fas fa-times"></i></button>`
            : '';
        return /*html*/ `<div class="card" data-id="${idea._id}">
          ${deleteBtn}
          <h3>
            ${idea.text}
          </h3>
          <p class="tag ${tagClass}">${idea.tag}</p>
          <p>
            Posted on <span class="date">${idea.date}</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>`;
      })
      .join('');

    this.addEventListeners();
  }
}

export default IdeaList;
